import { bffClient } from '$service';
import type { StageName } from '$types';

export const getPrevStage = (stage: StageName, stages: StageName[]): StageName => {
  const index = stages.indexOf(stage);
  if (index === -1) throw new Error(`stage ${stage} not found`);
  if (index === 0) return stage;
  return stages[index - 1];
};

export const getNextStage = (stage: StageName, stages: StageName[]): StageName => {
  const index = stages.indexOf(stage);
  if (index === -1) throw new Error(`stage ${stage} not found`);
  if (index === stages.length - 1) return stage;
  return stages[index + 1];
};

export const stagesTitles: Record<StageName, string> = {
  'personal-details': 'Personal details',
  address: 'Shipping address',
  shipping: 'Shipping method',
  review: 'Review',
};

export type PersonalDetailsStageData = Awaited<
  ReturnType<typeof bffClient.checkout.stages.personalDetails.get>
>['personalDetails'];
export type AddressStageData = Awaited<ReturnType<typeof bffClient.checkout.stages.address.get>>['address'];
export type ShippingStageData = Pick<
  Awaited<ReturnType<typeof bffClient.checkout.stages.shipping.get>>,
  'shippingMethods' | 'selectedShippingMethod'
>;
export type ReviewStageData = Awaited<ReturnType<typeof bffClient.checkout.stages.review.get>>;

export type SelectedStage =
  | {
      name: 'personal-details';
      data: PersonalDetailsStageData;
    }
  | {
      name: 'address';
      data: AddressStageData;
    }
  | {
      name: 'shipping';
      data: ShippingStageData;
    }
  | {
      name: 'review';
      data: ReviewStageData;
    };
