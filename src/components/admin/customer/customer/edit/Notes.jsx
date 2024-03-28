/*Component Name: Notes
Component Functional Details:  Notes .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';
import { useParams } from "react-router-dom";
import CustomerNoteService from 'services/admin/customerNotes/CustomerNoteService';
import Note from 'components/common/others/admin/CustomerCompany/Note';

const Notes = () => {
    const { id } = useParams();

    return (
        <>
            <Note API={CustomerNoteService.getListByCustomerId} id={id} ShowNotesData={true} />
        </>
    );
};

export default Notes;
