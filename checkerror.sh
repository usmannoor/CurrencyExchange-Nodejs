grep -iq erro $VAR1

#echo $? "Thisi  is iss"
if [ "$?" = "0" ]; then
        echo "error found"
        exit 1
else
        echo "error not found"
        exit 0
fi
