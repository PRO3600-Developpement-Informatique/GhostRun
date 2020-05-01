#!/usr/bin/env bash
gource \
  --camera-mode overview \
  --seconds-per-day 6 \
  --auto-skip-seconds 1 \
  --file-idle-time 0 \
  --key \
  --bloom-multiplier 0.5 \
  --bloom-intensity 0.5 \
  --background 555555 \
  --title "Ghost Run" \
  -1280x720 -o - |
ffmpeg \
  -y \
  -r 60 \
  -f image2pipe \
  -vcodec ppm \
  -i - \
  -vcodec libx264 \
  -preset medium \
  -pix_fmt yuv420p \
  -crf 8 \
  -threads 0 \
  -bf 0 \
  repo.mp4

