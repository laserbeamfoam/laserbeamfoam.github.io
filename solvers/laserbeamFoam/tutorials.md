---
title: Tutorials
layout: page
nav_order: 2
parent: laserbeamFoam
---

## Tutorial cases
The mesh and fields can be prepared in any of the tutorials with:
```
# Remove any old simulation files, e.g.
$ rm -r 0* 1* 2* 3* 4* 5* 6* 7* 8* 9*
# Then:
$ cp -r initial 0
$ blockMesh
$ setFields
```
The solver can then be run in serial with
```
$ laserbeamFoam
```
or in parallel deployment using MPI (6 cores are used here) with
```
$ decomposePar
$ mpirun -np 6 laserbeamFoam -parallel >log &
```


### 2D Plate Examples

In these cases, the penetration rate of an incident laser source is investigated based on the angle of incidence of the laser beam. Two cases are presented where the beam is perpendicular to the substrate or 45 degrees to the initial plate normal.

### 3D Plate Example

In this case, the two-dimensional 45-degree example is extended to three dimensions.

### 2D circular particles Example

In this example, a series of circular metallic regions are seeded on top of a planar substrate. The laser heat source traverses the domain and melts these regions, and their topology evolves accordingly.

### 2D Laser-Powder Bed Fusion Example

In this example, a two-dimensional domain is seeded with many small powder particles with a complex size distribution, representative of that observed in the L-PBF manufacturing process. The laser heat source traverses the domain, and some particles melt and re-solidify in the heat source's wake.