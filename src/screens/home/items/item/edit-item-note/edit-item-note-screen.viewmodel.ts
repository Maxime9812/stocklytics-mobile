import { AppDispatch } from '../../../../../core/create-store';
import { editItemNoteUseCase } from '../../../../../core/items/hexagon/usecases/edit-item-note/edit-item-note.usecase';

export type CreateEditItemNoteScreenViewModelParams = {
  itemId: string;
  dispatch: AppDispatch;
};

export const createEditItemNoteScreenViewModel = ({
  itemId,
  dispatch,
}: CreateEditItemNoteScreenViewModelParams) => {
  const editNote = async (note: string) => {
    return dispatch(editItemNoteUseCase({ itemId, note }));
  };

  return {
    editNote,
  };
};
