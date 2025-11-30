# R2 Audio Storage - Development Handoff

**Date:** 2025-11-28  
**Status:** Ready for development  
**Priority:** Phase 2  
**Contact back:** After audio files are being saved and URLs appear in spreadsheet

---

## Overview

Every mysay TTS call should save the audio file to Cloudflare R2 and add the public URL to the Google Sheets log. This allows developers to re-listen to TTS output for quality evaluation.

---

## Requirements

### Functional
1. After generating TTS audio, upload MP3 to R2
2. Generate a public URL for the audio file
3. Add the URL as a new column in the Google Sheets log
4. Don't block TTS playback - upload can be async

### Non-Functional
1. Upload should be fast (< 1 second)
2. If upload fails, TTS should still play (graceful degradation)
3. Audio files should be publicly accessible (no auth required to listen)

---

## Configuration

Add to `~/.mysay`:

```bash
# Cloudflare R2 Storage
export MYSAY_R2_ACCOUNT_ID="your-account-id"
export MYSAY_R2_ACCESS_KEY_ID="your-access-key"
export MYSAY_R2_SECRET_ACCESS_KEY="your-secret-key"
export MYSAY_R2_BUCKET_NAME="mysay-audio"
export MYSAY_R2_PUBLIC_URL="https://audio.yourdomain.com"  # or R2.dev URL
```

---

## Implementation

### File Naming Convention
```
{timestamp}_{mood}_{hash}.mp3

Example: 2025-11-28T12-30-45_done_a1b2c3.mp3
```

### Upload Flow

```
1. User runs: mysay --done "הַמִּשִׁימָה הוּשְׁלְמָה!"
2. Script calls ElevenLabs API → gets MP3 audio
3. Script saves to temp file → plays audio
4. (Async) Script uploads MP3 to R2
5. (Async) Script logs to Google Sheets with audio URL
6. Cleanup temp file
```

### R2 Upload (using AWS CLI compatible API)

```bash
# R2 is S3-compatible, so use aws cli or curl with AWS sig v4

# Option 1: AWS CLI (if installed)
aws s3 cp "$AUDIO_FILE" "s3://$BUCKET/$FILENAME" \
  --endpoint-url "https://$ACCOUNT_ID.r2.cloudflarestorage.com"

# Option 2: curl with AWS signature (more complex)
# See: https://developers.cloudflare.com/r2/api/s3/tokens/

# Option 3: Python boto3 (recommended)
python3 - << PYEOF
import boto3
s3 = boto3.client('s3',
    endpoint_url=f'https://{account_id}.r2.cloudflarestorage.com',
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key
)
s3.upload_file(local_file, bucket, remote_filename)
PYEOF
```

### Google Sheets Update

Current columns:
| Timestamp | Text | Voice ID | Mood | Rating | Notes |

Add new column:
| Timestamp | Text | Voice ID | Mood | **Audio URL** | Rating | Notes |

The Audio URL should be a clickable link to the R2-hosted MP3.

---

## Public Access Setup

### Option A: R2.dev subdomain (easiest)
1. In Cloudflare Dashboard → R2 → Your bucket → Settings
2. Enable "Public access" via r2.dev subdomain
3. URL pattern: `https://pub-{hash}.r2.dev/{filename}`

### Option B: Custom domain (recommended)
1. Add custom domain in R2 bucket settings
2. Point CNAME to R2
3. URL pattern: `https://audio.yourdomain.com/{filename}`

---

## Dependencies

Add to requirements:
- `boto3` (Python) - for R2 upload
- OR `aws` CLI configured for R2

---

## Testing Checklist

- [ ] R2 credentials configured in `~/.mysay`
- [ ] Test upload works: file appears in R2 bucket
- [ ] Public URL is accessible (can open in browser)
- [ ] Google Sheets shows Audio URL column
- [ ] Clicking URL plays the audio
- [ ] TTS still works if R2 upload fails (graceful degradation)
- [ ] Old audio files cleanup policy (optional - set R2 lifecycle rule)

---

## Security Notes

1. R2 credentials should ONLY be in `~/.mysay` (not committed to git)
2. Audio files are public - don't include sensitive info in TTS text
3. Consider R2 lifecycle rules to auto-delete old audio (e.g., after 30 days)

---

## Questions for Dev Team

1. Custom domain or r2.dev subdomain?
2. Audio retention period? (Forever / 30 days / 90 days)
3. Max file size limit?
4. Should failed uploads be logged somewhere?
