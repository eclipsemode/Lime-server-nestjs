export default interface IProfile {
  id: string;
  userId: string;
  email?: string;
  dateOfBirth?: Date;
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
