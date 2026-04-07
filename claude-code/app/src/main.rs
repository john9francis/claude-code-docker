use rand::prelude::*;

const PHOTON_COUNT: usize = 1000;
const PHANTOM_SIZE: f64 = 10.0; // cm
const STEP_SIZE: f64 = 0.1; // cm

#[derive(Debug, Clone, Copy)]
struct Photon {
    position: [f64; 3],
    direction: [f64; 3],
    energy: f64,
}

fn random_unit_vector<R: Rng>(rng: &mut R) -> [f64; 3] {
    // Marsaglia method
    loop {
        let x1: f64 = rng.gen_range(-1.0..1.0);
        let x2: f64 = rng.gen_range(-1.0..1.0);
        let s = x1 * x1 + x2 * x2;
        if s >= 1.0 {
            continue;
        }
        let z = 1.0 - 2.0 * s;
        let factor = (1.0 - z * z).sqrt();
        let y = 2.0 * x1 * x2;
        let x = 2.0 * x1 * (1.0 - s);
        return [x * factor, y * factor, z];
    }
}

fn main() {
    let mut rng = rand::thread_rng();
    let mut absorbed = 0;
    let mut escaped = 0;

    for _ in 0..PHOTON_COUNT {
        let mut photon = Photon {
            position: [PHANTOM_SIZE / 2.0, PHANTOM_SIZE / 2.0, PHANTOM_SIZE / 2.0],
            direction: random_unit_vector(&mut rng),
            energy: 1.0, // arbitrary units
        };

        loop {
            // move photon
            photon.position[0] += photon.direction[0] * STEP_SIZE;
            photon.position[1] += photon.direction[1] * STEP_SIZE;
            photon.position[2] += photon.direction[2] * STEP_SIZE;

            // absorption probability per step
            let absorb_prob = 0.01; // 1% per step in water
            if rng.gen_bool(absorb_prob) {
                absorbed += 1;
                break;
            }

            // check if outside phantom
            if photon.position.iter().any(|&p| p < 0.0 || p > PHANTOM_SIZE) {
                escaped += 1;
                break;
            }
        }
    }

    println!("Simulated {} photons", PHOTON_COUNT);
    println!("Absorbed: {}", absorbed);
    println!("Escaped: {}", escaped);
}
