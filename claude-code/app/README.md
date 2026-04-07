# Monte Carlo Photon Transport Simulator

This repository contains a minimal **Rust** application that performs a Monte‑Carlo simulation of photon transport in a hard‑coded cubic water phantom.

## Features

* 1 000 photons launched from the centre of a 10 cm × 10 cm × 10 cm water cube.
* Each photon moves in a random direction and steps forward in increments of 0.1 cm.
* At each step the photon has a 1 % chance of being absorbed.
* The simulation counts photons that are absorbed vs. those that escape the phantom.
* Very small dependency set – only the `rand` crate is required.

## Project layout

```
/home/app/
├─ Cargo.toml
└─ src/
   └─ main.rs
``` 

## Usage

```bash
# Build and run the simulator
cargo run --quiet
```

Example output:

```
Simulated 1000 photons
Absorbed: 86
Escaped: 914
```

## Customization

- `PHOTON_COUNT` – change the number of photons simulated.
- `STEP_SIZE` – adjust the step length; smaller steps give more accurate physics but take longer.
- `absorb_prob` – modify the absorption probability per step.
- Replace the hard‑coded phantom shape by editing the boundary checks.

## License

MIT
