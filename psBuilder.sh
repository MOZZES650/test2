# Download and extract BusyBox
wget https://busybox.net/downloads/busybox-1.37.0.tar.bz2
tar -xf busybox-1.37.0.tar.bz2
cd busybox-1.37.0

# Configure for a fully static build
make defconfig
sed -i 's/^.*CONFIG_STATIC.*$/CONFIG_STATIC=y/' .config

# Optional: Enter menuconfig to see all tools (like 'ps') are enabled by default
# make menuconfig

# Compile
make -j$(nproc) busybox
file busybox # Verify: should output "statically linked"

# To run 'ps' from the BusyBox binary:
./busybox ps
# You can also create a symlink: ln -s busybox ps; ./ps
