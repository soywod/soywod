{
  description = "Personal portfolio.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, utils, ... }:
    utils.lib.eachDefaultSystem
      (system:
        let
          name = (builtins.fromJSON (builtins.readFile ./package.json)).name;
          pkgs = import nixpkgs { inherit system; };
          nodejs = pkgs.nodejs-18_x;
          yarn = pkgs.yarn.override { inherit nodejs; };
        in
        {
          # nix develop
          devShell = pkgs.mkShell {
            buildInputs = [
              nodejs
              yarn
            ];
            shellHook = ''
              export NODE_ENV="development"
              export NODE_OPTIONS="--openssl-legacy-provider"
              export PATH="$PWD/node_modules/.bin/:$PATH"
            '';
          };
        }
      );
}
