const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResolvedSchema = new Schema(
  {
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'ClientUser',
      required: true
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    complaintId: {
      type: Schema.Types.ObjectId,
      ref: 'Complaint',
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Resolved = mongoose.model('Resolved', ResolvedSchema);

module.exports = Resolved;
