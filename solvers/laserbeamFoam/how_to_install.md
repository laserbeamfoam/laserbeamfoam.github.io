---
title: How to install
layout: page
nav_order: 2
parent: laserbeamFoam
---

## Installation

The current version of the code utilises the [OpenFOAM-10 libraries](https://openfoam.org/version/10/). A branch that compiles against the older OpenFOAM-6 libraries is provided. The code has been developed and tested using an Ubuntu installation but should work on any operating system capable of installing OpenFOAM. To install the laserbeamFoam solvers, first, install and load [OpenFOAM-10](https://openfoam.org/download/10-ubuntu/), then clone and build the laserbeamFoam library:

```
$ git clone https://github.com/micmog/laserbeamFoam.git laserbeamFoam
$ ./Allwmake -j
```
where the `-j` option uses all CPU cores available for building.

The installation can be tested using the tutorial cases described below.