import React,{useState} from "react";
import "./AddPopup.css";
import { Button, Stack } from "@mui/material";
const AddPopup=(props)=> {
    const {onSave,toggle} =props;
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const handleevent=(e)=> {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const restaurant = { name, address, phone, cuisine, email };
            const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
            restaurants.push(restaurant);
            onSave(restaurants);
            localStorage.setItem('restaurants', JSON.stringify(restaurants));
            props.toggle();
        }
        
    }
            
   const validateForm = () => {
        const newErrors = {};
        if (name.trim() === '') {
          newErrors.name = '*Name is required';
        }
        if (address.trim() === '') {
          newErrors.address = '*Address is required';
        }
        if (!/^\d{10}$/.test(phone)) {
          newErrors.phone = '*Phone number must be 10 digits';
        }
        if (cuisine.trim() === '') {
          newErrors.cuisine = '*Cuisine is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          newErrors.email = 'Email is not valid';
        }
        return newErrors;
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add Restaurant</h2>
                <form onSubmit={handleevent}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required
                        />
                        {errors.address && <div className="error">{errors.address}</div>}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                        {errors.phone && <div className="error" style={{ color: 'red' }}>{errors.phone}</div>}
                    </div>
                    <div>
                        <label htmlFor="cuisine">Cuisine:</label>
                        <input
                            type="text"
                            id="cuisine"
                            value={cuisine}
                            onChange={(event) => setCuisine(event.target.value)}
                            required
                        />
                        {errors.cuisine && <div className="error">{errors.cuisine}</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    
                    <button type="submit">Save</button>
                    <br/>
                    <br/>
                    <Stack direction="row" spacing={2}>
                        <Button type="close" variant="contained" href="#contained-buttons" onClick={toggle}>
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </div>
        </div>
    )
}
export default AddPopup;