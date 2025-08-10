# Order receipt canvas for NixOS Meetup CN #01

## Get started

You'll need to put [bitMatrix-A1](https://www.receiptfont.com/store/bitmatrix-a1/) at `packages/nixos-cn-meetup-canvas/public/bitmatrix-aligned.ttf`.

The font is removed from this repository and should be provided by the user.

If you want to use a memobird printer, connect to the same network as the printer, and put `MEMOBIRD_PRINTER_IP=192.168.10.1` in `packages/nixos-cn-meetup-canvas/.env`.

```bash
nix develop

pnpm i

turbo dev
```
