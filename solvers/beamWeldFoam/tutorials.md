---
title: Tutorials
layout: page
nav_order: 2
parent: beamWeldFoam
---

## Tutorial cases
To run any of the tutorials in serial mode:
```
delete any old simulation files, e.g:
$ rm -r 0* 1* 2* 3* 4* 5* 6* 7* 8* 9*
Then:
$ cp -r initial 0
$ blockMesh
$ setFields
$ beamWeldFoam
```
For parallel deployment, using MPI, following the setFields command:
```
$ decomposePar
$ mpirun -np 6 beamWeldFoam -parallel >log &
```
for deployment on 6 cores.

### Gallium Melting Case
A commonly used validation case for heat and mass transfer where melting and solidification is involved, is the simulation of Gallium melting in an enclosed container. In this example the beamWeldFoam solver is used to simulate the melting of the Gallium and the subsequent flow due to buoyancy. as time progresses the hot wall on the left-hand-side of the computational domain causes the Gallium in the local vicinity to melt. As the melt volume increases, buoyancy driven flow begings to dominate as the hot liquid Gallium rises and generates vortical flow structures in the liquid. The predicted melt profiles are in excellent agreement with those reported elsewhere, both numerically and experimentally [1].

### Marangoni Flow (Sen and Davies) Case
Another useful validation case for the solver is one in which a 2D cavity is partially filled such that the interface between the phases is initially flat. A temperature gradient is then developed across the domain. This temperature gradient induces a flow tangential to the interface due to the dependence on temperature of the surface tension, aka Marangoni flow. An analytical steasy-state solution for the free surface deformation exists for this case [2]. excellent agreement between the beamWeldFoam solver and the analytical solution is observed.

### Arc Welding Case
In this example a surface heat flux is applied to an Aluminium substrate representative of an arc-welding process. In this scenario, a metallic substrate is present in the domain, between two regions of Argon gas. The heat source is applied at t=0s, and at t=0.25s the power begins to ramp down until at t=0.35s the heat source is fully extinguished.Shortly following the extinction of the heat source the domain fully solidifies. The effect of Marangoni driven flow can clearly be seen in this example, as the surface flows are driven from regions of higher temperature to regions of lower temperature (due to the decrease in surface tension with temperature). Furthermore, once the weld-pool has fully penetrated the domain, surface tension prevents the material from falling out of the bottom of the substrate.

### Beam Welding Case
In this example beamWeldFoam is applied to simulate the power beam welding of a titanium alloy substrate. In this case, Ti6Al4V butt joints welded by a laser beam is simulated and the results are validated with the experimental study [3].
