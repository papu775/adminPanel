import React, { useState, useEffect } from 'react';
import Checkbox from "@material-tailwind/react/Checkbox"
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { useHistory } from 'react-router-dom';

const UserList = ({ users, ACTIVATE_DEACTIVATE_ACCOUNT, moveToDetailsPage }) => {
    const history = useHistory();
    const VIEW_USER = async (e, id) => {
        e.preventDefault();
        history.push(`/view-user/${id}`);
      };

    return (
        <>
            {
                users.map((user, i) => (
                    <tr>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">{i + 1}</td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">{user.fullName}</td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {user.phone}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {user.email}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {user.subscriptions.length > 0 ? 'Yes' : 'No'}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {user.purchasedItems.length > 0 ? 'Yes' : 'No'}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            <Checkbox
                                color="green"
                                text="Active"
                                id={`checkbox-${i}`}
                                defaultChecked={user.status == 'Activated'}
                                onChange={e => ACTIVATE_DEACTIVATE_ACCOUNT(e, user._id)}
                            />
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            <Button
                                color="blue"
                                buttonType="outline"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="dark"
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => VIEW_USER(e, user._id)}
                            >
                                <Icon name="visibility" size="2xl" />
                            </Button>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}

export default UserList;