# Download and extract the source
wget https://sourceforge.net/projects/procps-ng/files/Production/procps-ng-4.0.4.tar.xz
tar -xf procps-ng-4.0.4.tar.xz
cd procps-ng-4.0.4

# Configure for static linking and install to a custom directory
./configure --prefix=/opt/procps-static --enable-static --disable-shared LDFLAGS="-static"

# Compile only the 'ps' command
make -j$(nproc) ps
file ps/ps # Verify: should output "statically linked"
