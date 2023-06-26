import React, { useState, useEffect } from "react";
import {
    Modal,
    TextField,
    Button,
    Switch,
    FormControlLabel,
} from "@material-ui/core";

const ProductModal = ({ isOpen, onClose, onSave, selectedProduct }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [warrantyYears, setWarrantyYears] = useState("");
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        if (selectedProduct) {
            const {
                name,
                type,
                price,
                rating,
                warranty_years,
                available,
            } = selectedProduct;
            setName(name || "");
            setType(type || "");
            setPrice(price || "");
            setRating(rating || "");
            setWarrantyYears(warranty_years || "");
            setAvailable(available || false);
        } else {
            setName("");
            setType("");
            setPrice("");
            setRating("");
            setWarrantyYears("");
            setAvailable(false);
        }
    }, [selectedProduct]);

    const handleSave = () => {
        const productData = {
            name,
            type,
            price,
            rating,
            warranty_years: warrantyYears,
            available,
        };
        onSave(productData);
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute", backgroundColor: "#fff", padding: "20px", borderRadius: "4px" }}>
                <h2>{selectedProduct ? "Edit Product" : "Add Product"}</h2>
                <form>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Warranty Years"
                        value={warrantyYears}
                        onChange={(e) => setWarrantyYears(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={available}
                                onChange={(e) => setAvailable(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Available"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        style={{ marginRight: "10px" }}
                    >
                        {selectedProduct ? "Save" : "Add"}
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Close
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default ProductModal;
