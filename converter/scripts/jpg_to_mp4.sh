#!bin/sh
echo "[info] sh ./jpg_to_mp4 <input_image_name> <output_name>"
echo "[info] example input name : test.%04d.jpg"
echo "[info] example input name : test.mp4"

# input name : houdiniisntscary_donut.mantra_ipr.%04d.jpg
file_name=$1

# output name
out_name=$2

echo "[info] starting convertion ..."

ffmpeg -loglevel panic -y -f image2 -r 30 -i $file_name -vcodec libx264 -crf 18  -pix_fmt yuv420p $out_name

echo "[info] done"