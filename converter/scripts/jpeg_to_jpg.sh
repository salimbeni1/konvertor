#!bin/bash
# rename all file in the directory, from .jpeg to .jpg


echo "[info] Renaming .jpeg file in .jpg"

all_files=($(ls | grep .jpeg))
echo "[info] nb files: " ${#all_files[@]}

#we have to use sed option g as all filemanes are in the same line 
all_files_new_name=($(echo "${all_files[@]}" | sed -e 's/.jpeg/.jpg/g'))

#echo ${all_files[@]}
#echo ${all_files_new_name[@]}

if ((${#all_files[@]} > 0)); then
	echo "[info] starting renaming"
	for ((i=0;i<${#all_files[@]};++i)); do
		#echo "-" $i "${all_files[i]}" "${all_files_new_name[i]}"
		mv "${all_files[i]}" "${all_files_new_name[i]}"
	done
fi

#mv "${all_files[3]}" "${all_files_new_name[3]}"

echo "[info] done"
