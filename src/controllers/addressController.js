const Address = require("../models/Address");

// GET ALL ADDRESSES
const getAddresses = async (
    req,
    res
) => {
    try {

        const addresses =
            await Address.find({
                user: req.user.id,
            }).sort({
                isDefault: -1,
                createdAt: -1,
            });

        res.json({
            success: true,
            count: addresses.length,
            addresses,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// CREATE ADDRESS
const createAddress = async (
    req,
    res
) => {
    try {

        const address =
            await Address.create({
                ...req.body,
                user: req.user.id,
            });

        res.status(201).json({
            success: true,
            message:
                "Address added successfully",
            address,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE ADDRESS
const updateAddress = async (
    req,
    res
) => {
    try {

        const address =
            await Address.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user.id,
                },
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!address) {

            return res.status(404).json({
                success: false,
                message:
                    "Address not found",
            });
        }

        // HANDLE DEFAULT
        if (req.body.isDefault) {

            await Address.updateMany(
                {
                    user: req.user.id,
                    _id: {
                        $ne: address._id,
                    },
                },
                {
                    isDefault: false,
                }
            );
        }

        res.json({
            success: true,
            message:
                "Address updated successfully",
            address,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE ADDRESS
const deleteAddress = async (
    req,
    res
) => {
    try {

        const address =
            await Address.findOneAndDelete({
                _id: req.params.id,
                user: req.user.id,
            });

        if (!address) {

            return res.status(404).json({
                success: false,
                message:
                    "Address not found",
            });
        }

        res.json({
            success: true,
            message:
                "Address deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
};