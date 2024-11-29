import { type TeamSize } from "@common/constants";

export const Config = {
    regions: {
        na: {
            name: "Server",
            mainAddress: "http://198.98.56.20:8000",
            gameAddress: "ws://198.98.56.20:800<ID>"
        }
    },
    defaultRegion: "na"
} satisfies ConfigType as ConfigType;

export interface ConfigType {
    readonly regions: Record<string, Region>
    readonly defaultRegion: string
}

export interface Region {
    /**
     * The human-readable name of the region, displayed in the server selector.
     */
    readonly name: string

    /**
     * The address of the region's main server.
     */
    readonly mainAddress: string

    /**
     * Pattern used to determine the address of the region's game servers.
     * The string <ID> is replaced by the gameID given by the /getGame API, plus one.
     * For example, if gameID is 0, and gameAddress is "ws://127.0.0.1:800<ID>", the resulting address will be ws://127.0.0.1:8001.
     */
    readonly gameAddress: string
}

export interface ServerInfo {
    readonly protocolVersion: number
    readonly playerCount: number
    readonly maxTeamSize: TeamSize
    readonly nextSwitchTime: number
};
