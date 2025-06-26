import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkUpdateProperty } from "../../redux/property";
import { IUpdatePropertyForm } from "../../redux/types/property";
import { useAppSelector } from "../../redux/store";
// import "./CreatePropertyForm.css";
// import { RootState, useAppSelector } from "../../redux/store";

interface ICreatePropertyError {
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  bedrooms?: string;
  bathrooms?: string;
  sqft?: string;
  yearBuilt?: string;
  lotSize?: string;
  propertyType?: string;
  listPrice?: string;
  rentZestimate?: string;
  listDate?: Date;
  //   previewImage?: string;
  message?: string;
}

const UpdatePropertyFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { propertyId } = useParams<{ propertyId: string }>();
  const property = useAppSelector((state) =>
    propertyId ? state.property.byId[Number(propertyId)] : undefined
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  // console.log("THIS IS PROPERTY ID", propertyId);
  // console.log("THIS IS PROPERTY DATA", property);

  const [address, setAddress] = useState(property.address || "");
  const [city, setCity] = useState(property.city || "");
  const [state, setState] = useState(property.state || "");
  const [zipcode, setZipcode] = useState(property.zipcode || "");
  const [bedrooms, setBedrooms] = useState(property.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(property.bathrooms || "");
  const [sqft, setSqft] = useState(property.sqft || "");
  const [yearBuilt, setYearBuilt] = useState(property.yearBuilt || "");
  const [lotSize, setLotSize] = useState(property.lotSize || "");
  const [propertyType, setPropertyType] = useState(property.propertyType || "");
  const [listPrice, setListPrice] = useState(property.listPrice || "");
  const [rentZestimate, setRentZestimate] = useState(
    property.rentZestimate || ""
  );
  const [listDate, setListDate] = useState(property.listDate || "");
  //   const [previewImage, setPreviewImage] = useState(property.previewImage || "");
  //   const [images, setImages] = useState(property.images || [""]);

  const [errors, setErrors] = useState<ICreatePropertyError>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors: ICreatePropertyError = {};
    if (!address) validationErrors.address = "Address is required";
    if (!city) validationErrors.city = "City is required";
    if (!state) validationErrors.state = "State is required";
    if (!zipcode) validationErrors.zipcode = "Zipcode is required";
    if (!bedrooms) validationErrors.bedrooms = "Number of bedrooms is required";
    if (!bathrooms)
      validationErrors.bathrooms = "Number of bathrooms is required";
    if (!sqft) validationErrors.sqft = "Square footage is required";
    if (!propertyType)
      validationErrors.propertyType = "Property type is required";
    if (!listPrice) validationErrors.listPrice = "List price is required";
    // if (!previewImage.trim())
    //   validationErrors.previewImage = "Preview image URL is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const propertyData: IUpdatePropertyForm = {
      address,
      city,
      state,
      zipcode,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseFloat(bathrooms),
      sqft: parseInt(sqft),
      yearBuilt: parseInt(yearBuilt),
      lotSize: parseInt(lotSize),
      propertyType,
      listPrice: parseInt(listPrice),
      rentZestimate: parseInt(rentZestimate),
      listDate,
      //   previewImage,
      //   images: images.filter((img) => img.trim() !== ""),
    };

    const newProperty = await dispatch(
      thunkUpdateProperty(propertyData, propertyId)
    );

    if (newProperty) {
      // navigate('/');
      navigate(`/property/${propertyId}`);
    } else {
      setErrors({ message: "Failed to create property. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-property-form">
      <h2>Create a New Property</h2>
      <div className="property-form-content">
        {/* Basic Property Info */}
        <section className="property-basic-info">
          <h3>Property Details</h3>

          <label className="form-field">
            <div className="field-label-row">
              <span>Property Type *</span>
              {errors.propertyType && (
                <span className="field-error">{errors.propertyType}</span>
              )}
            </div>
            <select
              className="property-type-select"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Select Property Type</option>
              <option value="Single Family Home">Single Family Home</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Multi-Family">Multi-Family</option>
              <option value="Apartment">Apartment</option>
            </select>
          </label>

          <div className="bedrooms-bathrooms-row">
            <label className="form-field">
              <div className="field-label-row">
                <span>Bedrooms *</span>
                {errors.bedrooms && (
                  <span className="field-error">{errors.bedrooms}</span>
                )}
              </div>
              <input
                className="bedrooms-input"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder="3"
                min="0"
                step="1"
              />
            </label>

            <label className="form-field">
              <div className="field-label-row">
                <span>Bathrooms *</span>
                {errors.bathrooms && (
                  <span className="field-error">{errors.bathrooms}</span>
                )}
              </div>
              <input
                className="bathrooms-input"
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                placeholder="2"
                min="0"
                step="0.5"
              />
            </label>
          </div>

          <div className="property-size-row">
            <label className="form-field">
              <div className="field-label-row">
                <span>Square Footage *</span>
                {errors.sqft && (
                  <span className="field-error">{errors.sqft}</span>
                )}
              </div>
              <input
                className="sqft-input"
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="1500"
                min="0"
              />
            </label>

            <label className="form-field">
              <div className="field-label-row">
                <span>Year Built</span>
                {errors.yearBuilt && (
                  <span className="field-error">{errors.yearBuilt}</span>
                )}
              </div>
              <input
                className="year-built-input"
                type="number"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(e.target.value)}
                placeholder="2010"
                min="1800"
                max={new Date().getFullYear()}
              />
            </label>
          </div>

          <label className="form-field">
            <div className="field-label-row">
              <span>Lot Size (sq ft)</span>
              {errors.lotSize && (
                <span className="field-error">{errors.lotSize}</span>
              )}
            </div>
            <input
              className="lot-size-input"
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(e.target.value)}
              placeholder="5000"
              min="0"
            />
          </label>
        </section>

        {/* Address Section */}
        <section className="property-address-section">
          <h3>Property Address</h3>

          <label className="form-field">
            <div className="field-label-row">
              <span>Street Address *</span>
              {errors.address && (
                <span className="field-error">{errors.address}</span>
              )}
            </div>
            <input
              className="street-address-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main Street"
            />
          </label>

          <div className="address-details-row">
            <label className="form-field">
              <div className="field-label-row">
                <span>City *</span>
                {errors.city && (
                  <span className="field-error">{errors.city}</span>
                )}
              </div>
              <input
                className="city-input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Boston"
              />
            </label>

            <label className="form-field">
              <div className="field-label-row">
                <span>State *</span>
                {errors.state && (
                  <span className="field-error">{errors.state}</span>
                )}
              </div>
              <input
                className="state-input"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="MA"
                maxLength={2}
              />
            </label>

            <label className="form-field">
              <div className="field-label-row">
                <span>Zipcode *</span>
                {errors.zipcode && (
                  <span className="field-error">{errors.zipcode}</span>
                )}
              </div>
              <input
                className="zipcode-input"
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="02101"
                maxLength={5}
              />
            </label>
          </div>
        </section>

        {/* Financial Information */}
        <section className="property-financial-section">
          <h3>Financial Information</h3>

          <label className="form-field">
            <div className="field-label-row">
              <span>List Price * ($)</span>
              {errors.listPrice && (
                <span className="field-error">{errors.listPrice}</span>
              )}
            </div>
            <input
              className="list-price-input"
              type="number"
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
              placeholder="650000"
              min="0"
            />
          </label>

          <label className="form-field">
            <div className="field-label-row">
              <span>Monthly Rent Estimate ($)</span>
              {errors.rentZestimate && (
                <span className="field-error">{errors.rentZestimate}</span>
              )}
            </div>
            <input
              className="rent-estimate-input"
              type="number"
              value={rentZestimate}
              onChange={(e) => setRentZestimate(e.target.value)}
              placeholder="3200"
              min="0"
            />
          </label>

          <label className="form-field">
            <div className="field-label-row">
              <span>List Date</span>
              {/* {errors.listDate && (
                <span className="field-error">{errors.listDate}</span>
              )} */}
            </div>
            <input
              className="list-date-input"
              type="date"
              value={listDate}
              onChange={(e) => setListDate(e.target.value)}
            />
          </label>
        </section>

        {/* Images Section */}
        {/* <section className="property-images-section">
          <h3>Property Photos</h3>
          <p>Add images to showcase your property</p>

          <label className="form-field">
            <div className="field-label-row">
              <span>Preview Image URL *</span>
              {errors.previewImage && (
                <span className="field-error">{errors.previewImage}</span>
              )}
            </div>
            <input
              className="preview-image-input"
              type="url"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <h4>Additional Images</h4>
          {images.map((image, index) => (
            <label key={index} className="form-field">
              <span>Image {index + 1} URL</span>
              <input
                className={`additional-image-input image-${index + 1}`}
                type="url"
                value={image}
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  setImages(newImages);
                }}
              />
            </label>
          ))}
        </section> */}

        {errors.message && (
          <div className="form-error-message">{errors.message}</div>
        )}

        <div className="form-buttons">
          <button type="submit" className="submit-property-btn">
            Update Property
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePropertyFormPage;
