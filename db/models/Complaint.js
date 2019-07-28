const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'ClientUser',
      required: true
    },
    isResolved: {
      type: Boolean,
      default: false
    },
    resolvedId: {
      type: Schema.Types.ObjectId,
      ref: 'Resolved'
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'ClientUser'
    },
    isPending: {
      type: Boolean,
      default: true
    },
    isRejected: {
      type: Boolean,
      default: false
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    title: {
      type: String,
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

const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;
