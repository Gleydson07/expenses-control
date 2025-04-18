import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infra/auth/auth.module';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthGuard } from './infra/auth/guards/auth.guard';
import { CostCenterModule } from './app/modules/cost_center/cost-center.module';
import { ManagementModule } from './app/modules/management/management.module';
import { RoleModule } from './app/modules/role/role.module';
import { CategoryModule } from './app/modules/category/category.module';

const env = dotenv.config();
dotenvExpand.expand(env);

export const prefix = 'ms-expenses-control/api/v1';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [() => env.parsed],
    }),
    DatabaseModule,
    AuthModule,
    CostCenterModule,
    ManagementModule,
    RoleModule,
    CategoryModule,
    RouterModule.register([
      {
        path: `${prefix}/cost-centers`,
        module: CostCenterModule,
      },
      {
        path: `${prefix}/roles`,
        module: RoleModule,
      },
      {
        path: `${prefix}/categories`,
        module: CategoryModule,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
