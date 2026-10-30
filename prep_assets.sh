#!/bin/zsh
# imgs/ 의 원본 사진·영상을 웹용으로 줄여서 assets/ 에 넣는다.
# 사용법: ./prep_assets.sh ../imgs
set -e
SRC=${1:-../imgs}
OUT=$(dirname $0)/assets
mkdir -p $OUT
setopt null_glob
for f in $SRC/*.(jpeg|jpg|JPG|png|PNG|heic|HEIC); do
  n=${${f:t:r}#IMG_}
  [ -f $OUT/$n.jpg ] || sips -s format jpeg -s formatOptions 78 -Z 1800 $f --out $OUT/$n.jpg >/dev/null
done
for f in $SRC/*.(mov|MOV|mp4); do
  n=${${f:t:r}#IMG_}
  [ -f $OUT/$n.mp4 ] || ffmpeg -v error -y -i $f -an -vf scale=1600:-2 -c:v libx264 -crf 28 -preset slow \
    -movflags +faststart -pix_fmt yuv420p $OUT/$n.mp4
  [ -f $OUT/$n.poster.jpg ] || ffmpeg -v error -y -ss 1 -i $OUT/$n.mp4 -frames:v 1 -q:v 4 $OUT/$n.poster.jpg
done
ls $OUT
