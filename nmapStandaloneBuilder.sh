 #!/bin/bash
set -e  # Exit on any error

# Create working directory
WORKDIR="/home/mozzes/Hunting/shell/Scripts/execTOsend/nmapBuilder"
mkdir -p "$WORKDIR"
cd "$WORKDIR"

# 1. Install dependencies (if not already done)
sudo apt-get update
sudo apt-get install -y build-essential curl bzip2 tar gcc g++ make

# 2. Build static OpenSSL
curl -fsSLO https://www.openssl.org/source/openssl-1.1.1w.tar.gz
tar xzf openssl-1.1.1w.tar.gz
cd openssl-1.1.1w
./Configure no-shared no-zlib linux-x86_64 -static --prefix=/opt/ossl
make -j"$(nproc)"
sudo make install_sw
cd ..

# 3. Build static PCRE2
curl -fsSLO https://github.com/PCRE2Project/pcre2/releases/download/pcre2-10.43/pcre2-10.43.tar.bz2
tar xjf pcre2-10.43.tar.bz2
cd pcre2-10.43
./configure --disable-shared --enable-static --prefix=/opt/pcre2
make -j"$(nproc)"
sudo make install
cd ..

# 4. Build static libpcap
curl -fsSLO https://www.tcpdump.org/release/libpcap-1.10.4.tar.gz
tar xzf libpcap-1.10.4.tar.gz
cd libpcap-1.10.4
./configure --disable-shared --enable-static --prefix=/opt/libpcap --with-pcap=linux
make -j"$(nproc)"
sudo make install
cd ..

# 5. Build static nmap
curl -fsSLO https://nmap.org/dist/nmap-7.98.tar.bz2
tar xjf nmap-7.98.tar.bz2
cd nmap-7.98
export CPPFLAGS="-I/opt/ossl/include -I/opt/pcre2/include -I/opt/libpcap/include"
export LDFLAGS="-L/opt/ossl/lib -L/opt/pcre2/lib -L/opt/libpcap/lib -static"
./configure --with-openssl=/opt/ossl \
            --with-libpcre=/opt/pcre2 \
            --with-libpcap=/opt/libpcap \
            --with-libdnet=included \
            --without-zenmap \
            --without-ndiff \
            --without-nmap-update
make -j1 nmap

echo "Build complete! Binary located at: $(pwd)/nmap"
