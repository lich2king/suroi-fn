import { ZIndexes } from "../constants";
import { type Variation } from "../typings";
import { type EaseFunctions } from "../utils/math";
import { ObjectDefinitions, type ObjectDefinition, type ReferenceTo } from "../utils/objectDefinitions";
import { type Vector } from "../utils/vector";

export interface MinMax<T> {
    readonly min: T
    readonly max: T
}

export interface MeanDeviation<T> {
    readonly mean: T
    readonly deviation: T
}

export type ValueSpecifier<T> = T | MinMax<T> | MeanDeviation<T>;
export type NumericSpecifier = ValueSpecifier<number>;
export type VectorSpecifier = ValueSpecifier<Vector>;

export interface Animated<T> {
    readonly start: ValueSpecifier<T>
    readonly end: ValueSpecifier<T>
    readonly duration?: NumericSpecifier | "lifetime"
    readonly easing?: keyof typeof EaseFunctions
}

export interface SyncedParticleDefinition extends ObjectDefinition {
    /**
     * @default {1}
     */
    readonly scale?: Animated<number> | NumericSpecifier
    /**
     * @default {1}
     */
    readonly alpha?: Animated<number> | NumericSpecifier
    /**
     * @default {Infinity}
     */
    readonly lifetime?: NumericSpecifier
    /**
     * @default {0}
     */
    readonly angularVelocity?: NumericSpecifier
    /**
     * @default {Vec.create(0,0)}
     */
    readonly velocity?: Animated<Vector> | VectorSpecifier
    /**
     * @default {undefined}
     */
    readonly variations?: Variation
    /**
     * @default {ZIndexes.ObstaclesLayer1}
     */
    readonly zIndex?: ZIndexes
    readonly frame?: string
}

export interface SyncedParticlesDefinition {
    readonly type: ReferenceTo<SyncedParticleDefinition>
    readonly count: number
    readonly deployAnimation?: {
        readonly duration?: number
        readonly staggering?: {
            readonly delay: number
            readonly spawnPerGroup?: number
            readonly initialAmount?: number
        }
    }
    readonly spawnRadius: number
}

export const SyncedParticles = new ObjectDefinitions<SyncedParticleDefinition>([
    {
        idString: "smoke_grenade_particle",
        name: "Smoke grenade particle",
        scale: {
            start: {
                min: 1.5,
                max: 2
            },
            end: {
                min: 1.75,
                max: 2.25
            }
        },
        alpha: {
            start: 1,
            end: 0,
            easing: "expoIn"
        },
        angularVelocity: {
            min: -0.0005,
            max: 0.0005
        },
        velocity: {
            min: {
                x: -0.0002,
                y: -0.0002
            },
            max: {
                x: 0.0002,
                y: 0.0002
            }
        },
        lifetime: {
            mean: 20000,
            deviation: 1000
        },
        zIndex: ZIndexes.ObstaclesLayer4
    },
    {
        idString: "airdrop_smoke_particle",
        name: "Airdrop Smoke Particle",
        scale: {
            start: {
                min: 1.5,
                max: 2
            },
            end: {
                min: 1.75,
                max: 2.25
            }
        },
        alpha: {
            start: 1,
            end: 0,
            easing: "expoIn"
        },
        angularVelocity: {
            min: -0.0005,
            max: 0.0005
        },
        velocity: {
            min: {
                x: -0.002,
                y: -0.002
            },
            max: {
                x: 0.002,
                y: 0.002
            }
        },
        lifetime: {
            mean: 2000,
            deviation: 500
        },
        zIndex: ZIndexes.ObstaclesLayer4,
        frame: "smoke_grenade_particle"
    }
]);