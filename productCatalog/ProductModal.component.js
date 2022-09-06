import React, { useState, useEffect } from 'react';
import CustomModal from 'src/components/modal';
import * as Styled from './productCatalog.styled';

/*************
 *   TYPES   *
 *************/

export type Actions = {};

type Props = {
  actions: Actions,
  isModalOpen: boolean,
  closeModal: Function,
  productName: string,
  partnerUnitCostPrice: number
};

function ProductSettingModal({ isModalOpen, closeModal, productName, partnerUnitCostPrice }: Props) {
  const [updatedPartnerUnitCost, setUpdatedPartnerUnitCost] = useState('');

  useEffect(() => {
    setUpdatedPartnerUnitCost(partnerUnitCostPrice);
  }, [partnerUnitCostPrice]);

  const handleChange = e => {
    setUpdatedPartnerUnitCost(e.target.value);
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title={productName}
      leftButtonText="Cancel"
      rightButtonText="Update"
      leftButtonOnClick={closeModal}
      rightButtonOnClick={() => {}}
    >
      <Styled.Field>
        <Styled.Label>Partner Unit Cost</Styled.Label>
        <Styled.Input value={updatedPartnerUnitCost} onChange={handleChange} />
      </Styled.Field>
    </CustomModal>
  );
}

export default ProductSettingModal;
