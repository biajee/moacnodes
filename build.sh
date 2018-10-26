#!/bin/sh

message="Please input -t/-p for TEST/PROD environment."
target="exit"

for i in "$@"
do
case $i in
    -t|--test)
        message="Delivered to TEST."
        target="ubuntu@54.202.180.164:/home/ubuntu"
        pem="/Users/ychen/innowells/pem/moacnodes101.pem"
    ;;
    -p|--prod)
        message="Delivered to PROD"
        target="ubuntu@52.88.19.78:/home/ubuntu"
        pem="/Users/ychen/innowells/pem/moacpool.pem"
    ;;
esac
done

if test ${target} != "exit"
then
    meteor build --architecture os.linux.x86_64  ../build/moacnodes
    scp -i ${pem} ../build/moacnodes/moacnodes.tar.gz ${target}
fi

echo ${message}