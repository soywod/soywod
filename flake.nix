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
          pkgs = import nixpkgs { inherit system; };
        in
        {
          # nix develop
          devShell = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs_22
            ];
            shellHook = ''
              export PATH="$PWD/node_modules/.bin/:$PATH"
            '';
          };
        }
      );
}
