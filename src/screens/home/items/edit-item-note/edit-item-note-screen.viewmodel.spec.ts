import { createTestStore } from '../../../../core/create-store';
import { createEditItemNoteScreenViewModel } from './edit-item-note-screen.viewmodel';
import { editItemNoteUseCase } from '../../../../core/items/hexagon/usecases/edit-item-note/edit-item-note.usecase';

describe('EditItemNoteScreenViewModel', () => {
  it('Should call editItemNoteUseCase when call editNote', async () => {
    const store = createTestStore();

    const { editNote } = createEditItemNoteScreenViewModel({
      itemId: 'item-id',
      dispatch: store.dispatch,
    });

    await editNote('New note');

    expect(store.getDispatchedUseCaseArgs(editItemNoteUseCase)).toEqual({
      itemId: 'item-id',
      note: 'New note',
    });
  });
});
