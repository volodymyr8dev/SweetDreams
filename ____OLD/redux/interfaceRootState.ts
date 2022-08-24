export interface RootState {
  account: {
    userInformation: {
      user: {
        accounts: [
          {
            id: number;
            is_deluxe: number;
            device:any;
          },
        ];
      };
    };
    events: {
      location: {
        name: {description: string};
        locate: {
          lat: string;
          lng: string;
        };
      };
    };
    nursery: {
      id: string | number;
    };
  };
  power: {
    power: number;
  };
}
