import React, { useState, useEffect } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Container,
    Typography,
    Button,
    makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ProductModal from "./ProductModal";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },
    addButton: {
        float: "right",
        marginBottom: theme.spacing(2),
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.dark,
    },
    tableHeaderText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
}));

const ProductList = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    const handleOpenModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: "DELETE",
            });
            fetchProducts();
        } catch (error) {
            console.log("Error deleting product:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveProduct = async (productData) => {
        try {
            if (selectedProduct) {
                await fetch(
                    `http://localhost:3000/api/products/${selectedProduct._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(productData),
                    }
                );
            } else {
                await fetch("http://localhost:3000/api/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productData),
                });
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.log("Error saving product:", error);
        }
    };

    return (
        <Container className={classes.container}>
            <Typography variant="h4" component="h1" className={classes.title}>
                Product List
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                className={classes.addButton}
                onClick={handleOpenModal}
            >
                Add Product
            </Button>
            <Table>
                <TableHead>
                    <TableRow className={classes.tableHeader}>
                        <TableCell className={classes.tableHeaderText}>ID</TableCell>
                        <TableCell className={classes.tableHeaderText}>Name</TableCell>
                        <TableCell className={classes.tableHeaderText}>Type</TableCell>
                        <TableCell className={classes.tableHeaderText}>Price</TableCell>
                        <TableCell className={classes.tableHeaderText}>Rating</TableCell>
                        <TableCell className={classes.tableHeaderText}>
                            Warranty
                        </TableCell>
                        <TableCell className={classes.tableHeaderText}>
                            Available
                        </TableCell>
                        <TableCell className={classes.tableHeaderText}>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>{product._id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.type}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.rating}</TableCell>
                            <TableCell>{product.warranty_years}</TableCell>
                            <TableCell>{product.available ? "Yes" : "No"}</TableCell>
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleEditProduct(product)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDeleteProduct(product._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isModalOpen && (
                <ProductModal
                    isOpen={isModalOpen}
                    selectedProduct={selectedProduct}
                    onSave={handleSaveProduct}
                    onClose={handleCloseModal}
                />
            )}
        </Container>
    );
};

export default ProductList;
