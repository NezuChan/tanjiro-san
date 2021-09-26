import { Guild } from "../entities/Guild";
import { getMongoRepository, MongoRepository } from "typeorm";
import { Snowflake } from "discord.js";

export class GuildDatabaseManager {
    public repository!: MongoRepository<Guild>;
    public _initRepos() {
        this.repository = getMongoRepository(Guild);
    }

    public async get(guild: Snowflake): Promise<Guild> {
        const data = (await this.repository.findOne({ guild })) ?? this.repository.create({ guild });
        await this.repository.save(data);
        return data;
    }
}