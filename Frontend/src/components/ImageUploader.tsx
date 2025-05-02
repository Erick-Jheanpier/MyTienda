interface ImageUploaderProps {
  name: string;
  label: string;
  required?: boolean;
  initialImage?: string;
}

export default function ImageUploader({ 
  name, 
  label, 
  required, 
  initialImage 
}: ImageUploaderProps) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="file"
        className="form-control"
        name={name}
        accept="image/*"
        required={required}
      />
      {initialImage && (
        <div className="mt-2">
          <img 
            src={initialImage} 
            alt="Previsualización" 
            className="img-thumbnail"
            style={{ maxWidth: '200px' }}
          />
          <small className="text-muted d-block mt-1">Imagen actual</small>
        </div>
      )}
    </div>
  );
}