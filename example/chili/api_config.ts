/**
 * @description 接口配置对象
 * @description 接口名尽量 “动词” 开头
 */
export enum Eapis {
  getPhotos
}

interface Iapi {
  option: {
    method: string;
    url: string;
  };
  sim?: boolean;
  kernel?: Function;
  middle?: Function;
}

interface Iapis {
  [Eapis.getPhotos]: Iapi;
}

const apiConfig: Iapis = {
  // NOTE: example
  [Eapis.getPhotos]: {
    // api name
    option: {
      // api option
      method: "GET",
      url: "/photos"
    },
    sim: true // 使用精简数据
  }
};

export default apiConfig;
