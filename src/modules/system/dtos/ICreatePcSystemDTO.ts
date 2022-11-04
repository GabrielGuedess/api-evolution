interface IDefault {
  so: string;
  cpu: string;
  memory: string;
  gpu: string;
  hd: string;
}

export interface ICreatePcSystemDTO {
  game_id: string;
  minimal: IDefault;
  recommended: IDefault;
}
