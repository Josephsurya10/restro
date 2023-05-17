    import React,{useState} from "react";
    import "./AddPopup.css";
    import { Button, Stack } from "@mui/material";

    const EditPopup = (props) => {
        console.log("abc");
        const {onSave,selectedTableData,index,toggleEdit} =props;
        const [editName, setEditName] = useState(selectedTableData?.name || "" );
        const [editAddress, setEditAddress] = useState(selectedTableData?.address || "" );
        const [editPhone, setEditPhone] = useState(selectedTableData?.phone || "" );
        const [editCuisine, setEditCuisine] = useState(selectedTableData?.cuisine || "" );
        const [editEmail, setEditEmail] = useState(selectedTableData?.email || "" );
        const [errors, setErrors] = useState({});
        const Edithandleevent=(e)=> {
            e.preventDefault();
                const newErrors = validateForm();
                if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                } else {
                    const restaurant = { name:editName, address:editAddress, phone:editPhone, cuisine:editCuisine, email:editEmail };
                    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
                    restaurants[index]=restaurant; 
                    onSave(restaurants,index);
                    localStorage.setItem('restaurants', JSON.stringify(restaurants));
                    props.toggleEdit();
                }  
            }
        


        const validateForm = () => {
            const newErrors = {};
            if (editName.trim() === '') {
            newErrors.editName = '*Name is required';
            }
            if (editAddress.trim() === '') {
            newErrors.editAddress = '*Address is required';
            }
            if (!/^\d{10}$/.test(editPhone)) {
            newErrors.editPhone = '*Phone number must be 10 digits';
            }
            if (editCuisine.trim() === '') {
            newErrors.editCuisine = '*Cuisine is required';
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
            newErrors.editEmail = 'Email is not valid';
            }
            return newErrors;
        };
    return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>You can Edit now!</h2>
                    <form onSubmit={Edithandleevent}>
                        <div>
                            <label htmlFor="editname" >Name:</label>
                            <input
                                type="text"
                                id="editname"
                                value={editName}
                                onChange={(event) => setEditName(event.target.value)}
                                required
                             />
                            {errors.editName && <div className="error">{errors.editName}</div>}
                        </div>
                        <div>
                            <label htmlFor="editaddress">Address:</label>
                            <input
                                type="text"
                                id="editaddress"
                                value={editAddress}
                                onChange={(event) => setEditAddress(event.target.value)}
                                required
                            />
                            {errors.editAddress && <div className="error">{errors.editAddress}</div>}
                        </div>
                        <div>
                            <label htmlFor="editphone">Phone:</label>
                            <input
                                type="tel"
                                id="editphone"
                                value={editPhone}
                                onChange={(event) => setEditPhone(event.target.value)}
                                required
                            />
                            {errors.editPhone && <div className="error" style={{ color: 'red' }}>{errors.editPhone}</div>}
                        </div>
                        <div>
                            <label htmlFor="editcuisine">Cuisine:</label>
                            <input
                                type="text"
                                id="editcuisine"
                                value={editCuisine}
                                onChange={(event) => setEditCuisine(event.target.value)}
                                required
                            />
                            {errors.editCuisine && <div className="error">{errors.editCuisine}</div>}
                        </div>
                        <div>
                            <label htmlFor="editemail">Email:</label>
                            <input
                                type="email"
                                id="editemail"
                                value={editEmail}
                                onChange={(event) => setEditEmail(event.target.value)}
                                required
                            />
                            {errors.editEmail && <div className="error">{errors.editEmail}</div>}
                        </div>
                        
                        <button type="submit">Save</button>
                        <br/>
                        <br/>
                        <Stack direction="row" spacing={2}>
                            <Button type="close" variant="contained" href="#contained-buttons" onClick={toggleEdit}>
                                Cancel
                            </Button>
                        </Stack>
                    </form>
                
                </div>

            </div>
        )

    } 

    export default EditPopup;
