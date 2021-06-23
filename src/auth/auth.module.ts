import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

// Auth module를 앱 모듈에서 import
@Module({
  providers: [
    {
      provide: APP_GUARD, //guard를 앱 모든곳에서 사용한다면 ADD_GUARD를 provide하면 된다.
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
