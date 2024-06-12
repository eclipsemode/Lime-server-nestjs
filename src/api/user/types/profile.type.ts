export default interface IProfile {
  id: string;
  userId: string;
  email?: string;
  dateOfBirth?: {
    id: string;
    profileId: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  name?: string;
  surname?: string;
  street?: string;
  house?: string;
  floor?: string;
  entrance?: string;
  room?: string;
  createdAt: Date;
  updatedAt: Date;
}
