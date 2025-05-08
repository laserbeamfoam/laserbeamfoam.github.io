---
title: Documentation
layout: page
nav_order: 2
parent: laserbeamFoam
---


## Algorithm

Initially, the solver loads the mesh, reads in fields and boundary conditions, and selects the turbulence model (if specified). The main solver loop is then initiated. First, the time step is dynamically modified to ensure numerical stability. Next, the two-phase fluid mixture properties and turbulence quantities are updated. The discretised phase-fraction equation is then solved for a user-defined number of subtime steps (typically 3) using the multidimensional universal limiter with explicit solution solver [MULES](https://openfoam.org/release/2-3-0/multiphase/). This solver is included in the OpenFOAM library and performs conservative solutions of hyperbolic convective transport equations with defined bounds (0 and 1 for $α_1$). Once the updated phase field is obtained, the program enters the pressure–velocity loop, where p and u are corrected alternatingly. $T$ is also solved in this loop so that the buoyancy predictions are correct for the $U$ and $p$ fields. Correcting the pressure and velocity fields in the sequence is known as pressure implicit with the splitting of operators (PISO). In the OpenFOAM environment, PISO is repeated for multiple iterations at each time step. This process is called the merged PISO- semi-implicit method for pressure-linked equations (SIMPLE) or the pressure-velocity loop (PIMPLE) process, where SIMPLE is an iterative pressure–velocity solution algorithm. PIMPLE continues for a user-specified number of iterations. 
The main solver loop iterates until program termination. A summary of the simulation algorithm is presented below:

* `laserbeamFoam` Simulation Algorithm Summary:
  
  * Initialize simulation data and mesh 
  * WHILE $t < t_{\text{end}}$ DO
  * 1. Update $\Delta t$ for stability
  * 2. Phase equation sub-cycle
  * 3. Update interface location for the heat source application
  * 4. Update fluid properties
  * 5. Ray-tracing for Heat Source application at the surface
  * 6. PISO Loop
    * 1. Form $U$ equation
    * 2. Energy Transport Loop
      * 1. Solve $T$ equation
      * 2. Update fluid fraction field
      * 3. Re-evaluate source terms due to latent heat
    * 3. PISO
        * 1. Obtain and correct face fluxes
        * 2. Solve $p$ Poisson equation
        * 3. Correct $U$
  * 7. Write fields
  

There are no constraints on how the computational domain is discretised.

## Visualising the rays in ParaView

`laserbeamFoam` writes the individual ray beams to `VTK/rays_<TIME_INDEX>.vtk`, where `<TIME_INDEX>` is the time-step index, i.e. 1, 2, 3, etc. ParaView recognises that these files are in a sequence, so they can all be loaded together: `File` -> `Open...` -> Select `rays_..vtk`. As the VTK files do not store time-step information, by default, ParaView assumes the time-step size for the rays is 1 s; however, you can use the ParaView “Temporal Shift Scale” filter on the rays object to sync the ray time with the OpenFOAM model time, where the OpenFOAM time-step value (e.g. 1e-5) is used as the `Scale`.


## License
OpenFOAM, and by extension, the `laserbeamFoam` application, is licensed free and open source only under the [GNU General Public Licence version 3](https://www.gnu.org/licenses/gpl-3.0.en.html). One reason for OpenFOAM’s popularity is that its users are granted the freedom to modify and redistribute the software and have a right to continued free use within the terms of the GPL.

## Acknowledgements
Tom Flint and Joe Robson thank the EPSRC for financial support through the associated programme grant LightFORM (EP/R001715/1). Joe Robson thanks the Royal Academy of Engineering/DSTL for funding through the RAEng/DSTL Chair in Alloys for Extreme Environments.

Philip Cardiff and Gowthaman Parivendhan authors gratefully acknowledge financial support from I-Form, funded by Science Foundation Ireland (SFI) Grant Number 16/RC/3872, co-funded under the European Regional Development Fund and by I-Form industry partners. The fourth author additionally acknowledges financial support from the Irish Research Council through the Laureate programme, grant number IRCLA/2017/45, and Bekaert, through the Bekaert University Technology Centre (UTC) at University College Dublin (www.ucd.ie/bekaert). 

OPENFOAM® is a registered trade mark of OpenCFD Limited, producer and distributor of the OpenFOAM software via www.openfoam.com.

## Citing This Work
If you use `laserbeamFoam` in your work. Please use the following to cite our work:

- laserbeamFoam: Laser ray-tracing and thermally induced state transition simulation toolkit
  TF Flint, JD Robson, G Parivendhan, P Cardiff - SoftwareX, 2023 - https://doi.org/10.1016/j.softx.2022.101299

Once the SoftwareX 'Software Update' Manuscript is accepted, please cite it if you use the multi-component versions.

## References

Flint, T. F., Robson, J. D., Parivendhan, G., & Cardiff, P. (2023). laserbeamFoam: Laser ray-tracing and thermally induced state transition simulation toolkit. SoftwareX, 21, 101299.

Flint, T. F., Parivendhan, G., Ivankovic, A., Smith, M. C., & Cardiff, P. (2022). beamWeldFoam: Numerical simulation of high energy density fusion and vapourisation-inducing processes. SoftwareX, 18, 101065.

Flint, T. F., et al. "A fundamental analysis of factors affecting chemical homogeneity in the laser powder bed fusion process." International Journal of Heat and Mass Transfer 194 (2022): 122985.

Flint, T. F., T. Dutilleul, and W. Kyffin. "A fundamental investigation into the role of beam focal point, and beam divergence, on thermo-capillary stability and evolution in electron beam welding applications." International Journal of Heat and Mass Transfer 212 (2023): 124262.

Parivendhan, G., Cardiff, P., Flint, T., Tuković, Ž., Obeidi, M., Brabazon, D., Ivanković, A. (2023) A numerical study of processing parameters and their effect on the melt-track profile in Laser Powder Bed Fusion processes, Additive Manufacturing, 67, 10.1016/j.addma.2023.103482.

## Disclaimer

This offering is not approved or endorsed by OpenCFD Limited, producer and distributor of the OpenFOAM software via www.openfoam.com, and owner of the OPENFOAM® and OpenCFD® trade marks.

![visitors](https://visitor-badge.deta.dev/badge?page_id=micmog.LaserbeamFoam)
1;95;0c