---
title: How to install
layout: page
nav_order: 2
parent: beamWeldFoam
---

## Installation

The current version of the code utilises the [OpenFoam6 libraries](https://openfoam.org/version/6/). The code has been developed and tested using an Ubuntu installation, but should work on any operating system capable of installing OpenFoam. To install the beamWeldFoam solver, first follow the instructions on this page: [OpenFoam 6 Install](https://openfoam.org/download/6-ubuntu/) to install the OpenFoam 6 libraries.

To use with OpenFoam10 - please select the OF10 branch.

Then navigate to a working folder in a shell terminal, clone the git code repository, and build.

```
$ git clone https://github.com/tomflint22/beamWeldFoam.git beamWeldFoam
$ cd beamWeldFoam/applications/solvers/beamWeldFoam/
$ wclean
$ wmake
```
The installation can be tested using the tutorial cases described below.
