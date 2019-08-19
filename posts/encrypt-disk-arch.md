---
title: Disk encryption on Arch Linux
desc: How to set up disk encryption on Arch Linux with LUKS
date: '2019-03-03'
tags:
  - arch linux
  - system
  - security
  - encryption
  - LUKS
---

In this post, I explain how to set up disk encryption on [Arch
Linux](https://www.archlinux.org/) with
[LUKS](https://guardianproject.info/archive/luks/). Be aware that your disk
will be formatted.

## BIOS (UEFI)

Access your BIOS, and change these options:

- Disable Secure Boot
- Enable AHCI mode

## USB flah media

To install Arch Linux, you need to set up an USB flash installation media. I
recommand to follow the [USB flash installation
media](https://wiki.archlinux.org/index.php/USB_flash_installation_media) from
the official wiki.

## Pre-installation


- Boot on the USB key
- Load your keyboard layout if different from QWERTY:
  ```bash
  # List of available layouts:
  # ls /usr/share/kbd/keymaps/**/*.map.gz
  loadkeys <layout>
  ```
- Delete all partitions (except the USB one):
  ```bash
  fdisk /dev/<root-device>
  ```
- Check that the disk type is set to GPT (label)
- Add a boot partition of 550M (EFI System)
- Add a root partition with the rest (Linux filesystem)
- Setup LUKS encryption on root partition:
  ```bash
  cryptsetup --verbose --cipher aes-xts-plain64 --key-size 512 --hash sha512 --iter-time 5000 --use-random luksFormat <root-partition>
  ```
- Unlock the root partition
  ```bash
  cryptsetup open --type luks <root-partition> root
  ```
- Format the root partition in EXT4
  ```bash
  mkfs.ext4 /dev/mapper/root
  ```
- Format the boot partition in FAT32
  ```bash
  mkfs.fat -F32 <boot-partition>
  ```
- Mount all partitions
  ```bash
  mount /dev/mapper/root /mnt
  mkdir /mnt/boot
  mount <boot-partition> /mnt/boot
  ```

## Installation

- Update keyring:
  ```bash
  pacman -Sy archlinux-keyring
  ```
- Install base system:
  ```bash
  pacstrap -i /mnt base base-devel
  ```
- Generate fstab:
  ```bash
  genfstab -pU /mnt >> /mnt/etc/fstab
  ```
- If you have a SSD, edit `/mnt/etc/fstab` and replace `relatime` by `noatime` in the root partition (not the boot)
- Chroot your new system:
  ```bash
  arch-chroot /mnt
  ```
- Set up hostname:
  ```bash
  echo <hostname> > /etc/hostname
  ```
- Set up root password:
  ```bash
  passwd
  ```
- Add user
  ```bash
  useradd -m -G wheel -s /bin/<shell> <username>
  passwd <username>
  ```
- Allow wheel group to use sudo (uncomment line `%wheel ALL=(ALL) ALL` via `visudo` command)
- Set up locales
  ```bash
  ln -sf /usr/share/zoneinfo/Europe/Helsinki /etc/localtime
  hwclock --systohc
  sed -i 's/#en_GB.UTF-8 UTF-8/en_GB.UTF-8 UTF-8/g' /etc/locale.gen
  echo LANG=en_GB.UTF-8 > /etc/locale.conf
  echo KEYMAP=<keymap> > /etc/vconsole.conf
  locale-gen
  ```
- Set up bootloader
  ```bash
  bootctl --path=/boot install
  ```
- Edit `/etc/mkinitcpio.conf`:
  ```conf
  MODULES=(ext4)
  ...
  HOOKS=(base udev autodetect modconf block keymap encrypt filesystems keyboard fsck)
  ```
- Edit `/boot/loader/entries/arch.conf`:
  ```conf
  title   Arch Linux
  linux   /vmlinuz-linux
  initrd  /initramfs-linux.img
  options cryptdevice=/dev/<root-device>:root root=/dev/mapper/root rw quiet
  ```
- Edit `/boot/loader/loader.conf`:
  ```conf
  timeout 0
  default arch
  editor 0
  ```
- Finsh install:
  ```bash
  mkinitcpio -p linux
  exit
  umount -R /mnt
  cryptsetup close root
  reboot
  ```

## Sources

  - https://wiki.archlinux.org/index.php/USB_flash_installation_media
  - https://wiki.archlinux.org/index.php/installation_guide
