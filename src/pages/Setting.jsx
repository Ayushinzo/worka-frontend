import React from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Input } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function Setting() {
    const [image, setImage] = React.useState(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    };

    return (
        <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md bg-gradient-to-b from-white to-blue-50 flex items-center justify-center'>
            <form className='w-[400px] flex flex-col gap-4 p-3 rounded shadow-md bg-white'>
                <div>
                    <Input
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                        size="small"
                        hidden
                    />
                </div>
                {image ? (
                    <div className="flex justify-center !rounded-full w-full h-[150px]">
                        <InputLabel htmlFor="image-upload">
                            <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} className='cursor-pointer p-1 w-[150px] h-full' />
                        </InputLabel>
                    </div>
                ) : (
                    <InputLabel htmlFor="image-upload">
                        <div className="flex justify-center w-full h-[150px]">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROgY9BG36B1t7RZCr_i18RcjgfSJTFyUx0-w&s" alt="No Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} className='cursor-pointer p-1 w-[150px] h-full' />
                        </div>
                    </InputLabel>
                )}
                <TextField id="name" label="Name" variant="outlined" size="small" />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    size="small"
                />
                <Button startIcon={<SaveIcon />} variant="contained" color="primary">
                    Save
                </Button>
            </form>
        </div>
    )
}

export default Setting
